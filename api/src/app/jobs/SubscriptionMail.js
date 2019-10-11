import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Subscription Success',
      template: 'subscription',
      context: {
        provider: meetup.user.name,
        user: user.name,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', ás' h:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
