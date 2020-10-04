import { html } from 'lit-html';

import '/_dist_/components/registration/new-user-form.js';

export default {
    title: 'New user form',
    component: 'new-user-form'
};

export const form = () => html`
  <new-user-form></new-user-form>
  `;
