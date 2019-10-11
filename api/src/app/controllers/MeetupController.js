import {
  isBefore,
  startOfHour,
  parseISO,
  startOfDay,
  endOfDay,
  subHours,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { page = 1, date } = req.query;
    const where = {};

    if (date) {
      const dayStart = parseISO(date);
      where.date = {
        [Op.between]: [startOfDay(dayStart), endOfDay(dayStart)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      order: [['date', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'title',
        'description',
        'location',
        'user_id',
        'banner_id',
        'date',
        'past',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const { date, banner_id } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(401).json({ error: 'Date not permited' });
    }

    const checkAvailability = await Meetup.findOne({
      where: { user_id: req.userId, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      return res
        .status(401)
        .json({ error: 'Meetup cannot be created on this date' });
    }

    const isFile = await File.findByPk(banner_id);

    if (banner_id && !isFile) {
      return res.status(400).json({ error: 'Banner not found' });
    }

    const {
      id,
      title,
      description,
      location,
      banner,
      user,
    } = await Meetup.create(
      {
        ...req.body,
        user_id: req.userId,
      },
      {
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'name', 'path', 'url'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
        ],
      },
    );

    return res.json({
      id,
      title,
      description,
      location,
      date,
      banner,
      user,
    });
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found!' });
    }

    return res.json({
      id: meetup.id,
      title: meetup.title,
      descrition: meetup.description,
      location: meetup.location,
      date: meetup.date,
      past: meetup.past,
      user: meetup.user,
      banner: meetup.banner,
    });
  }

  async update(req, res) {
    const { date, banner_id } = req.body;

    const isFile = await File.findByPk(req.body.banner_id);

    if (banner_id && !isFile) {
      return res.status(400).json({ error: 'File not found.' });
    }

    const dateWithSub = subHours(parseISO(date), 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({ error: 'Date not permitted' });
    }

    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
        user_id: req.userId,
        canceled_at: null,
      },
    });

    const {
      id,
      title,
      description,
      location,
      canceled_at,
    } = await meetup.update(req.body);

    return res.json({
      id,
      title,
      description,
      location,
      canceled_at,
      date,
    });
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      user_id: req.userId,
      canceled_at: null,
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    const dateWithSub = subHours(meetup.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({ error: 'Date not permited' });
    }

    await meetup.destroy();

    return res.json();
  }
}

export default new MeetupController();
