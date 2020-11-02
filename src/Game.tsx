import React from 'react';
import './App.css';

import Z from './assets/zoovu-z.svg'
import O from './assets/zoovu-o.svg'
import V from './assets/zoovu-v.svg'
import U from './assets/zoovu-u.svg'
import Header from './Header';

export default class Game extends React.Component<any, any> {

  state = {
    dragValue: '',
    timer: 0,
    cards: new Array
  }

  interval: any;

  componentDidMount() {
    this.generateCards()
    this.initInterval()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  initInterval = () => {
    this.interval = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 })
    }, 1000);
  }

  addTime = () => this.setState({ timer: this.state.timer + 10 })

  allowDrop = (ev: any) => {
    ev.preventDefault();
  }

  drag = (ev: any) => this.setState({ dragValue: ev.target.id })

  drop = (ev: any) => {
    try {
      ev.preventDefault();
      ev.target.appendChild(document.getElementById(this.state.dragValue));
      if (!parseInt(ev.target.id)) return
      this.validate(this.state.dragValue, ev.target.id)
    }
    catch {
      console.log('Card stayed on the same slot')
    }
  }

  moveBack = () => {
    this.validator.forEach((item: any) => {
      var element = document.getElementById(item.source) as any
      element.appendChild(document.getElementById(item.letter));
      item.match = false
    })
    this.generateCards()
  }

  validator = [
    { letter: 'Z', id: '1', source: 'one' },
    { letter: 'O', id: '2', source: 'two' },
    { letter: 'O2', id: '3', source: 'three' },
    { letter: 'V', id: '4', source: 'four' },
    { letter: 'U', id: '5', source: 'five' },
  ]

  shuffle = (array: JSX.Element[]) => array.sort(() => Math.random() - 0.5);

  generateCards = () => {
    this.setState({
      cards: this.shuffle([
        <div key={1} className={'card m-2'} id={'one'} onDragOver={this.allowDrop} onDrop={this.drop}>
          <img draggable onDrag={this.drag} id={'Z'} src={Z} alt={'Z'} />
        </div>,
        <div key={2} className={'card m-2'} id={'two'} onDragOver={this.allowDrop} onDrop={this.drop}>
          <img draggable onDrag={this.drag} id={'O'} src={O} alt={'O'} />
        </div>,
        <div key={3} className={'card m-2'} id={'three'} onDragOver={this.allowDrop} onDrop={this.drop}>
          <img draggable onDrag={this.drag} id={'O2'} src={O} alt={'O'} />
        </div>,
        <div key={4} className={'card m-2'} id={'four'} onDragOver={this.allowDrop} onDrop={this.drop}>
          <img draggable onDrag={this.drag} id={'V'} src={V} alt={'V'} />
        </div>,
        <div key={5} className={'card m-2'} id={'five'} onDragOver={this.allowDrop} onDrop={this.drop}>
          <img draggable onDrag={this.drag} id={'U'} src={U} alt={'U'} />
        </div>
      ])
    })
  }

  validate = (a: string, b: string) => {
    if (!b) return;

    const obj = this.validator.find((v: any) => v.letter[0] == a[0] && v.id == b)

    if (!obj) this.addTime()

    if (this.checkIfCorrect()) {
      clearInterval(this.interval)
      setTimeout(() => {
        this.moveBack()
        this.setState({ timer: 0 }, () => this.initInterval())
      }, 10000)
    }
  }

  checkIfCorrect = () => {
    let result = new Array
    let ids = ['1', '2', '3', '4', '5']
    ids.map((item: string) => {
      const div = document.getElementById(item)
      if (!div?.children.length) result.push(false)
      else {
        result.push(!!this.validator.find((v: any) => v.letter[0] == div.children[0].id[0] && v.id == item))
      }
    })
    console.log(result.every((i: any) => i))
    return result.every((i: any) => i)
  }

  render() {
    return <>
      <Header currentTime={this.state.timer} />
      <div className={'inline-flex w-100'}>
        {this.state.cards.map((card: any) => card)}
      </div>
      <div className={'p-2'}>
        <label className={'bold float-l fs-12 gray'}>And drop them here to make the logo great again</label>
      </div>
      <div className={'inline-flex w-100'}>
        {['1', '2', '3', '4', '5'].map((element: string) => <div key={element} id={element}
          onDragOver={this.allowDrop}
          onDrop={this.drop}
          className={'card empty-card m-2'} />)}
      </div>
    </>
  }
}
