import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Card = (props) => {
    return (
        <div style={{marginLeft:'20%'}}>
            <img width="75" src={props.data.avatar_url} />
            <div style={{ color: 'blue', display: 'inline-block', marginLeft: '20px' }}>
                <div style={{marginLeft:'20%'}}>{props.data.name}</div>
                <div>{props.data.company}</div>
            </div>
        </div>
    )
}


const CardList = (props) => {
    return (<div>
        {props.cards.map((data, index) => <span key={index}><Card data={data} /></span>)}
    </div>)
}

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: ''
        }
        this.cardClickHandler = this.cardClickHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    cardClickHandler() {

    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event:Form Submit', this.state.userName)
        axios.get('https://api.github.com/users/'+this.state.userName)
            .then(response=>{
                console.log("response data is",response.data);
                console.log(response.status);
                this.props.onSubmit(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }
    changeHandler(event) {
        this.setState({
            userName: event.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h1 style={{textAlign:"center",color:"blue"}}>Github Profiling of Prolific React Developers</h1>
                <input style={{marginLeft:'20%'}} type="text" value={this.state.userName} name="name" onChange={this.changeHandler} value={this.state.userName} placeholder="Github username" />
                <button type="submit" onClick={this.cardClickHandler}>Add Github Profile</button>
            </form>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                // {
                //     name: 'Paul O’Shannessy',
                //     company: 'Facebook',
                //     avatar_url: 'https://avatars1.githubusercontent.com/u/8445?v=4'
                // },
                // {
                //     name: 'Ben Alpert is @spicyj',
                //     company: 'Facebook',
                //     avatar_url: 'https://avatars0.githubusercontent.com/u/7585659?v=4'
                // }
            ]
        }
    }
    addNewCard=(cardInfo)=>{
        console.log("card Info",cardInfo);
        this.setState({
            cardInfo:this.state.cards.push(cardInfo)
        })

    }
    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards} />
            </div>
        )
    }
}
ReactDOM.render(
    <App />, document.getElementById('root')
)