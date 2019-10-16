import { isBefore, startOfHour, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

import SubscriptionMail from '../jobs/SubscriptionMail';

import Queue from '../../lib/Queue';

class SubscritionController {
  // listar as inscrições daquele meetup
  async index(req, res) {
    const subs = await Subscription.findAll({
      where: {
        user_id: req.userId,
        meetup_id: req.params.meetupId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          attributes: ['id', 'title', 'description', 'location', 'date'],
        },
      ],
      attributes: ['id', 'meetup_id'],
    });

    return res.json(subs);
  }

  // um usuário vai se inscrever no meetup
  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id === req.userId) {
      return res.status(400).json({ error: 'You can not subscribe on your meetup' });
    }

    const user = await User.findByPk(req.userId);

    const { id, user_id, meetup_id } = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json({
      id,
      user_id,
      meetup_id,
    });
  }

  // um usuário pode se desinscrever do meetup se caso ainda não aconteceu.
  async delete(req, res) {
    const { meetupId, id } = req.params;

    const meetup = await Meetup.findOne({
      id: meetupId,
      canceled_at: null,
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    const hourStart = startOfHour(parseISO(meetup.date));

    if (isBefore(hourStart, new Date().getTime())) {
      return res.status(400).json({ error: 'Date invalid' });
    }

    const subs = await Subscription.findOne({
      where: {
        id,
        meetup_id: meetupId,
        user_id: req.userId,
      },
    });

    if (!subs) {
      return res.status(400).json({ error: 'You are not subscription that meetup.' });
    }

    await subs.destroy();

    return res.json();
  }
}

export default new SubscritionController();
