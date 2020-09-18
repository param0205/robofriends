import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';  
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

 class App extends Component{
 	constructor(){
 		super()
 		this.state={
 			robot:[],
 			Searchfield:''
 		}
}        

         componentDidMount(){
         	fetch('https://jsonplaceholder.typicode.com/users')
         	.then(response =>  response.json())
            .then(users => this.setState({robot:users}));
     
         }

 		onsearchchange=(event) =>{
 			this.setState({Searchfield:event.target.value})
 			
 		
 		}
 		

 	render(){
        const {robot,Searchfield}=this.state;
 		const filteredrobot=robot.filter(robot=> {
 				return robot.name.toLowerCase().includes(Searchfield.toLowerCase());
             })
             return !robot.length ? 
             	 <h1>Loading</h1>:

              
                (
 		<div className='tc'>
 		<h1 className='f1'>Robofriends</h1>
 		<Searchbox searchChange={this.onsearchchange} />
 		   <Scroll>  
               <ErrorBoundry>
 		       <Cardlist robot={filteredrobot}/>
               </ErrorBoundry>
 		     </Scroll>
 		</div>
 		);
 	
 }
}
export default App;