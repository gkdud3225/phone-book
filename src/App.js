import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-1111-1111'
      }
    ]
  }

  handleCreate = (data) => {
    const {information} = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    });
  }

  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info => info.id != id)
    });
  }

  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information: information.map(
        info => info.id === id 
        ? {...info, ...data} // 새 객체를 만들어 기존의 값과 전달받은 데이터를 덮어쓴다.
        : info // 기존 값 유지
      )
    });
  }

  render() {
    const {information} = this.state;
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList data={this.state.information} onRemove={this.handleRemove} onUpdate={this.handleUpdate}/>
      </div>
    );
  }
}

export default App;
