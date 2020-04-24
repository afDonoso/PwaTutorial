import React, { Component } from 'react'

export default class Trivia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            trivia: null
        }
    }

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('trivia') === null) {
                this.setState({
                    trivia: null
                })
            } else {
                this.setState({
                    trivia: localStorage.getItem('trivia')
                })
            }
        }

        fetch('https://opentdb.com/api.php?amount=1&category=18')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    trivia: res.results[0]
                })
                localStorage.setItem('trivia', res.results[0])
            })
    }

    render() {
        console.log(this.state.trivia)
        const question = this.state.trivia ? this.state.trivia.question : 'loading...'
        const answer = this.state.trivia ? this.state.trivia.correct_answer : ''

        return (
            <div>
                <h3>{question}</h3>
                <h4 className="answer">{answer}</h4>
            </div>
        )
    }
}