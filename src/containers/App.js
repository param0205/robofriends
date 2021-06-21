import React, { Component } from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/Cardlist';  
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import { setSearchField, requestRobots} from '../action.js';


const mapStateToProps =state=>
{
    return {
        searchField:state.searchRobots.searchField,
        robots:state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error:state.requestRobots.error
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        onsearchchange:(event)=> dispatch(setSearchField(event.target.value)),
      onRequestRobots:()=> dispatch(requestRobots())     
    }
}

 class App extends Component{
 	 
     

         componentDidMount(){
         	this.props.onRequestRobots();
     
         }

 	render(){
        const {searchField,onsearchchange,robots,isPending}=this.props;
 		const filteredrobot=robots.filter(robots=> {
 				return robots.name.toLowerCase().includes(searchField.toLowerCase());
             })
             return isPending ? 
             	 <h1>Loading</h1>:

              
                (
 		<div className='tc'>
 		<h1 className='f1'>Robofriends</h1>
 		<Searchbox searchChange={onsearchchange} />
 		   <Scroll>  
               <ErrorBoundry>
 		       <Cardlist robot={filteredrobot}/>
               </ErrorBoundry>
 		     </Scroll>
 		</div>
 		);
 	
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);