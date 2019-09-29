import { register, mount } from 'riot';

var modalEdit = {
  'css': null,

  'exports': {
    onMounted(props, state) {
        if (props.data) {
            document.getElementById('_id').placeholder = props.data._id;
            document.getElementById('first_name').placeholder = props.data.first_name;
            document.getElementById('last_name').placeholder = props.data.last_name;
            document.getElementById('email').placeholder = props.data.email;
            document.getElementById('address').placeholder = props.data.address;
            document.getElementById('contact').placeholder = props.data.contact;
        }
    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 class="modal-title custom_align" id="Heading">Edit Your Detail </h4></div><div class="modal-body"><div class="form-group"><input class="form-control " type="text" name="_id" id="_id" placeholder="_id"/></div><div class="form-group"><input class="form-control " type="text" name="first_name" id="first_name" placeholder="first_name"/></div><div class="form-group"><input class="form-control " type="text" name="last_name" id="last_name" placeholder="first_name"/></div><div class="form-group"><textarea rows="2" class="form-control" name="address" id="address" placeholder="Address"></textarea></div><div class="form-group"><input class="form-control " type="text" name="email" id="email" placeholder="first_name"/></div><div class="form-group"><input class="form-control " type="text" name="contact" id="contact" placeholder="first_name"/></div></div><div class="modal-footer "><button type="button" class="btn btn-warning btn-lg" style="width: 100%;"><span class="glyphicon glyphicon-ok-sign"></span> Update</button></div></div></div></div>',
      []
    );
  },

  'name': 'modal-edit'
};

var modalDelete = {
  'css': null,

  'exports': {
    state :{
            id:'props.data_id'
    },

    onBeforeMount(props, state) {
       
    },

    onMounted(props, state) {
        
       this.update({
           id:this.props.data_id
       });
       console.log(state.id);
    },

    delete_client(id) {
        console.log(this.state);
        $("#delete").modal('hide');
        $("#delete").on('hidden.bs.modal', function () {
            //this.callback
            console.log(id);
        });

    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="delete" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><h4 expr13="expr13" class="modal-title" id="Heading"> </h4></div><div class="modal-body"><div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Are you sure\r\n                        you want to delete this Record?</div><input expr14="expr14"/></div><div class="modal-footer "><button expr15="expr15" type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok-sign"></span> Yes</button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button></div></div></div></div>',
      [{
        'redundantAttribute': 'expr13',
        'selector': '[expr13]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return [scope.id_client, 'Delete Confirmation '].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr14',
        'selector': '[expr14]',

        'expressions': [{
          'type': expressionTypes.VALUE,

          'evaluate': function(scope) {
            return scope.state.id;
          }
        }]
      }, {
        'redundantAttribute': 'expr15',
        'selector': '[expr15]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.delete_client(scope.id_client);
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'data-id',

          'evaluate': function(scope) {
            return scope.state.id;
          }
        }]
      }]
    );
  },

  'name': 'modal-delete'
};

const axios = require('axios');
console.log('data client');
axios.get('http://localhost:3333/api/clients')
      .then(function (response) {
          // handle success
          this.list_client = response.data;
          this.update();
          
          console.log(list_client);
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      });

register('modal-edit', modalEdit);
register('modal-delete', modalDelete);

var ClientDisplay = {
  'css': null,

  'exports': {
    actEdit(id,first_name,last_name,email,address,contact){
      const arrDat ={
        _id         : id,
        first_name  : first_name,
        last_name   : last_name,
        email       : email,
        address     : address,
        contact     : contact
      };
      mount('modal-edit',{data:arrDat});
    },

    actDelete(id){
      console.log('act delete from client-display => '+id);
       mount('modal-delete',{data_id:id});
      //this.props.callback(this);
    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<table class="table"><thead><td expr2="expr2"> <td></td><tbody><tr expr3="expr3"></tr></tbody></td><modal-edit expr11="expr11"></modal-edit><modal-delete expr12="expr12"></modal-delete></thead></table>',
      [{
        'redundantAttribute': 'expr2',
        'selector': '[expr2]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return scope.list_client;
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template(
          '<td><input type="checkbox" class="checkthis"/></td><th expr4="expr4" scope="row"> </th><th expr5="expr5" scope="row"> </th><th expr6="expr6" scope="row"> </th><th expr7="expr7" scope="row"> </th><th expr8="expr8" scope="row"> </th><td><p data-placement="top" data-toggle="tooltip" title="Edit"><button expr9="expr9" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span>Edit</button></p></td><td><p data-placement="top" data-toggle="tooltip" title="Delete"><button expr10="expr10" class="btn btn-primary btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-ice-lolly" aria-hidden="true"></span>Delete</button></p></td>',
          [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'first_name',

              'evaluate': function(scope) {
                return scope.client.first_name;
              }
            }]
          }, {
            'redundantAttribute': 'expr4',
            'selector': '[expr4]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.client.first_name;
              }
            }]
          }, {
            'redundantAttribute': 'expr5',
            'selector': '[expr5]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.client.last_name;
              }
            }]
          }, {
            'redundantAttribute': 'expr6',
            'selector': '[expr6]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.client.email;
              }
            }]
          }, {
            'redundantAttribute': 'expr7',
            'selector': '[expr7]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.client.address;
              }
            }]
          }, {
            'redundantAttribute': 'expr8',
            'selector': '[expr8]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.client.contact;
              }
            }]
          }, {
            'redundantAttribute': 'expr9',
            'selector': '[expr9]',

            'expressions': [{
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return () => scope.actEdit(scope.client._id,scope.client.first_name,scope.client.last_name,scope.client.email,scope.client.address,scope.client.contact);
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'data-id',

              'evaluate': function(scope) {
                return scope.client._id;
              }
            }]
          }, {
            'redundantAttribute': 'expr10',
            'selector': '[expr10]',

            'expressions': [{
              'type': expressionTypes.EVENT,
              'name': 'onclick',

              'evaluate': function(scope) {
                return () => scope.actDelete(scope.client._id);
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'data-id',

              'evaluate': function(scope) {
                return scope.client._id;
              }
            }]
          }]
        ),

        'redundantAttribute': 'expr3',
        'selector': '[expr3]',
        'itemName': 'client',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.list_client;
        }
      }, {
        'type': bindingTypes.TAG,
        'getComponent': getComponent,

        'evaluate': function(scope) {
          return 'modal-edit';
        },

        'slots': [],
        'attributes': [],
        'redundantAttribute': 'expr11',
        'selector': '[expr11]'
      }, {
        'type': bindingTypes.TAG,
        'getComponent': getComponent,

        'evaluate': function(scope) {
          return 'modal-delete';
        },

        'slots': [],
        'attributes': [],
        'redundantAttribute': 'expr12',
        'selector': '[expr12]'
      }]
    );
  },

  'name': 'clientdisplay'
};

const axios$1 = require('axios');

register('client-display', ClientDisplay);

// find all the DOM nodes called `<ClientDisplay>` and
// mount them with the component previously registered
mount('client-display');

var app = {
  'css': null,

  'exports': {
    onMounted(props, state) {
    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div id="container"><nav class="navbar navbar-expand-lg navbar-light bg-light"><a expr0="expr0" class="navbar-brand" href="#"> </a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><form class="form-inline my-2 my-lg-0"><input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/><button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></form></div></nav></div><div class="container"><div class="row"><div class="col-md-12"><client-display expr1="expr1"></client-display></div></div></div>',
      [{
        'redundantAttribute': 'expr0',
        'selector': '[expr0]',

        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,

          'evaluate': function(scope) {
            return scope.props.titleBar;
          }
        }]
      }, {
        'type': bindingTypes.TAG,
        'getComponent': getComponent,

        'evaluate': function(scope) {
          return 'client-display';
        },

        'slots': [],
        'attributes': [],
        'redundantAttribute': 'expr1',
        'selector': '[expr1]'
      }]
    );
  },

  'name': 'app'
};

export default app;
