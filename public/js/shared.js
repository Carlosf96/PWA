Vue.component('register-dialog', {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  props: ['toggleLoggedIn'],
  template: `
  <dialog id='register-dialog' class='mdl-dialog'>
    <h4 class='mdl-dialog_title>Register</h4>
    <div class='mdl-dialog__content'>
      <div class='mdl-grid center-items'>
        <div class='mdl-textfield mdl-js-textfield'>
          <input v-model='username' class='mdl-mdl-textfield__input' type='text' id='register-username'>
          <label class='mdl-textfield__label' for='register-username'>Username</label>
        </div>
      </div>
      <div class='mdl-grid center-items'>
        <div class='mdl-textfield mdl-js-textfield'>
          <input v-model='password' class='mdl-mdl-textfield__input' type='password' id='register-password'>
          <label class='mdl-textfield__label' for='register-password'>Password</label>
        </div>
      </div>
      <div class="mdl-grid center-items">
        <div class="mdl-textfield mdl-js-textfield">
          <span id="register-error"></span>
        </div>
      </div>
    </div>
    <div class="mdl-dialog__actions">
      <button @click="closeRegister" type="button" class="mdl-button close">Cancel</button>
      <button @click="register" type="button" class="mdl-button">Register</button>
    </div>
  </dialog>
  `,
  methods: {
    closeRegister: function () {
      const registerDialog = document.querySelector('#register-dialog');
      dialogPolyfill.registerDialog(registerDialog);
      registerDialog.close();
    },
    register: function () {
      let options = { username: this.username, password: this.password };

      hoodie.account
        .signUp(options)
        .then(account => {
          return hoodie.account.signIn(options);
        })
        .then(account => {
          this.toggleLoggedIn();
          this.closeRegister();
          return account;
        })
        .catch(err => {
          console.log(err);
          document.querySelector('#register-error').innerHTML = 'Error occured on Registration';
        });
      
    }
  },
})