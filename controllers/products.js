const faker = require( 'faker' );

class ProductServices {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate( amount = 10 ) { //(Random)
    for ( let i = 0; i < amount; i++ ) {
      this.products.push( {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt( faker.commerce.price(), 10 ),
        image: faker.image.imageUrl()
      } );
    }
  }

  //--- Create ---
  create( product ) { //(Receives JSON)
    this.products.push( {
      id: faker.datatype.uuid(),
      name: product.name,
      price: product.price,
      image: product.image
    } );

    const productsSize = this.products.length;

    return( this.products[ productsSize - 1 ] );
  }

  //--- Read ---
  read( id = null ) {
    if ( id !== null ) {
      const product = this.products.find( ( item ) => { return( item.id === id ); } );
      return( product );
    } else {
      return( this.products );
    }
  }

  //--- Update ---
  update( id, data, type = 'patch' ) {
    if ( id === null ) {
      return( 'The product ID is necessary' );
    }

    const productIndex = this.products.findIndex( ( item ) => { return( item.id === id ); } );
    if ( productIndex === -1 ) {
      return( 'The product ID does not exists' );
    }

    if ( type === 'put' ) {
      this.products[ productIndex ] = {
        id: this.products[ productIndex ].id,
        ...data
      };
    } else if ( type === 'patch' ) {
      this.products[ productIndex ] = {
        ...this.products[ productIndex ],
        ...data
      }
    }

    return( this.products[ productIndex ] );

  }

  //--- Delete ---
  delete( id = null ) {
    if ( id === null ) {
      return( 'The product ID is necessary' );
    }

    const productIndex = this.products.findIndex( ( item ) => { return( item.id === id ); } );
    if ( productIndex === -1 ) {
      return( 'The product ID does not exists' );
    }

    this.products.splice( productIndex, 1 );
  }
}

module.exports = ProductServices;
