import React, {Component} from 'react';
import {Container, Card, Image} from "semantic-ui-react";

class CategoriesPage extends Component {

    render() {
        const list = [
            {id: 1, name: 'AM', description: 'Ciclomotor (idade mínima 16 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_AM.png')},
            {id: 2, name: 'A1', description: 'Motociclo - 11kw/125cc (idade mínima 16 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_A1.png')},
            {id: 3, name: 'A2', description: 'Motociclo - 35kw (idade mínima 18 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_A2.png')},
            {id: 4, name: 'A', description: 'Motociclo (idade mínima 24 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_A.png')},
            {id: 5, name: 'B1', description: 'Quadriciclo (idade mínima 16 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_B1.png')},
            {id: 6, name: 'A1B1', description: 'Motociclo + Quadriciclo (idade mínima 16 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_A1B1.png')},
            {id: 7, name: 'A2B', description: 'Ligeiro + Motociclo (idade mínima 18 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_A2B.png')},
            {id: 8, name: 'AB', description: 'Ligeiro + Motociclo (idade mínima 24 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_AB.png')},
            {id: 9, name: 'B', description: 'Ligeiro Caixa Automática (idade mínima 18 anos)', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_B.png')},
            {id: 10, name: 'B', description: ' Ligeiro Caixa Manual ( idade mínima 18 anos )', price: 900, pl: 32, tl: 28, image: require('../images/categories/pic_price_B.png')},
            
        ]

        return (
            <Container>
                <div className="ui stackable centered grid" style={{marginBottom: "65px", marginTop: "40px"}}>
                    <div className="column ten wide">
                    <Card.Group>
                        {list.map(category => 
                            <Card 
                                key={category.id}
                                fluid 
                                color='orange'
                            >
                                <Card.Content>
                                    <Image className="floated right" src={category.image} size='tiny' />
                                    <Card.Header>Categoria {category.name}</Card.Header>
                                    <Card.Meta>{category.description}</Card.Meta>
                                    <Card.Description>
                                        <p><strong>Preço: {category.price}€</strong></p>
                                        <p>Número de aulas:</p>
                                        <p>● Práticas: {category.pl}</p>
                                        <p>● Teóricas: {category.tl}</p>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Group>
                    </div>
                </div>
            </Container>
        );
    }
}

export default CategoriesPage;