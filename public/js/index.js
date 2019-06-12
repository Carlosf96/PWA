const vm = new Vue({//init Vue instance
  el: '#app',
  data: {//state values
    name: '',
    cost: '',
    quantity: '',
    items: [],
    isLoggedIn: false
  },
  computed: {//prop to get total cost of items
    total: function() {
      return this.items.reduce((acc, cVal) => acc + cVal.subTotal, 0);
    }
  },
  methods: {
    toggleLoggedIn: function() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    onSubmit: function(event) {
      if (this.name && this.cost && this.quantity) {
        hoodie.store.withIdPrefix('item').add({
          name: this.name,
          cost: this.cost,
          quantity: this.quantity,
          subTotal: this.cost * this.quantity
        });

        this.name = '';
        this.cost = '';
        this.quantity = '';
      } else {
        const snackbarContainer = document.querySelector('#toast');
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: 'All fields are required'
        });
      }
    },
    deleteRow: function (itemId) { 
      hoodie.store.withIdPrefix('item').remove(itemId);
    },
    saveList: function () {
      hoodie.store
        .withIdPrefix('item')
        .findAll()
        .then((items) => {
          //stores the list
          hoodie.store.withIdPrefix('list').add({
            cost: this.total,
            items: items
          })
        }).catch((err) => {
          console.log(err);
        });
      
      hoodie.store
        .withIdPrefix('item')
        .remove(items)
      .then(() => {
        //clears table
        this.items = [];

        //notifiy the user
        var snackbarContainer = document.querySelector('#toast');
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: 'List savved succesfuly'
        })
      }).catch((err) => {
        console.log(err);
        //notify user of error
        var snackbarContainer = document.querySelector('#toast');
        snackbarContainer.MaterialSnackbar.showSnackbar({
          message: err.message
        })
      });
    }
  },
  created() {
    hoodie.store.withIdPrefix('item').on('add', item => vm.items.push(item));

    //retrieve items on the current list
    hoodie.store
      .withIdPrefix('item')
      .findAll()
      .then(items => (vm.items = items));

    hoodie.account.get('session').then(function(session) {
      if (!session) {
        // user is singed out
        vm.isLoggedIn = false;
      } else if (session.invalid) {
        vm.isLoggedIn = false;
      } else {
        // user is signed in
        vm.isLoggedIn = true;
      }
    });
  }
});