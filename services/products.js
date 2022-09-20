const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

const entityName = {
  name: 'product',
  pluralName: 'products'
};

class Services {

  constructor() {
    this.data = [];
    this.generate();
  }

  generate( amount = 10 ) { //(Random creation)
    for ( let i = 0; i < amount; i++ ) {
      this.data.push( {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt( faker.commerce.price(), 10 ),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean()
      } );
    }
  }

  getIndex( id ) {
    if ( id === null ) {
      throw boom.badRequest( 'The ' + entityName.name + ' ID is necessary' );
    }

    const index = this.data.findIndex( ( item ) => { return( item.id === id ); } );
    if ( index === -1 ) {
      throw boom.notFound( 'The ' + entityName.name + ' with the ID "' + id + '" does not exists' );
    }

    if ( this.data[ index ].isBlocked === true ) {
      throw boom.unauthorized( 'The ' + entityName.name + ' with the ID "' + id + '" is blocked' );
    }

    return( index );
  }

  //--- Create ---
  async create( element ) { //(Receives JSON)
    const newElement = {
      id: faker.datatype.uuid(),
      name: element.name,
      price: element.price,
      image: element.image,
      isBlocked: element.isBlocked || false
    }

    try {
      this.data.push( newElement );
      return( newElement );
    } catch( err ) {
      throw boom.badImplementation( 'An error occurred while creating ' + entityName.name );
    }
  }

  //--- Read ---
  async read( id = null ) {
    if ( id !== null ) {
      const index = this.getIndex( id );
      return( this.data[ index ] );
    } else {
      return( this.data );
    }
  }

  //--- Update ---
  async update( id, newData, type = 'patch' ) {
    const index = this.getIndex( id );

    let updatedElement = {};

    if ( type === 'put' ) {
      updatedElement = {
        ...newData,
        id: this.data[ index ].id
      };
    } else if ( type === 'patch' ) {
      updatedElement = {
        ...this.data[ index ],
        ...newData,
        id: this.data[ index ].id
      }
    }

    try {
      this.data[ index ] = updatedElement;
      return( this.data[ index ] );
    } catch( err ) {
      throw boom.badImplementation( 'An error occurred while updating ' + entityName.name + ' with id ' + id );
    }
  }

  //--- Delete ---
  async delete( id = null ) {
    const index = this.getIndex( id );

    try {
      const deleted = this.data.splice( index, 1 )[ 0 ];
      return( deleted );
    } catch( err ) {
      throw boom.badImplementation( 'An error occurred while deleting ' + entityName.name + ' with id ' + id );
    }
  }
}

module.exports = Services;
