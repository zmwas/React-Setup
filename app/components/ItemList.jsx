import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import Details from './Details';
import {List, ListItem} from 'material-ui/List';

class ItemList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchData('http://localhost:3000/customers?_limit=5&_page=3');
    }

    render() {
        if (this.props.hasErrored) {
            return (<p>Sorry! There was an error loading the items</p>);
        }
        if (this.props.isLoading) {
            return (<p>Loading… </p>);
        }
        return (
            <div>
            <hr/>
            <List>
                {this.props.items.map((item) => (
                    <ListItem key={item.id}>
                        <Link to={`/item/${item.id}`}>{item.first_name}  {item.last_name} </Link>
                    </ListItem>
                ))}
            </List>
            <hr/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items.data,
        hasErrored: state.items.itemsHasErrored,
        isLoading: state.items.itemsIsLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
