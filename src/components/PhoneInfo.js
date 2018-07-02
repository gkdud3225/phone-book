import React, {Component} from 'react';

class PhoneInfo extends Component {
    static defaultProps = {
        info: { // info값이 undefined일때 기본값 설정.
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    state = {
        editing: false,
        name: '',
        phone: ''
    }

    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }
    
    // editing값을 반전시키는 함수. true->false, false->true
    handleToggleEdit = () => {
        const {editing} = this.state;
        this.setState({
            editing: !editing
        });
    }

    // input에서 onChage 이벤트가 발생될때 실행되는 함수.
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    // editing값이 바뀔때 처리하는 함수.
    // 수정을 눌렀을 땐 기존 값이 input에 나타나고, 수정을 적용할 땐 input 값을 부모에게 전달한다.
    componentDidUpdate(prevProps, prevState) {
        const {info, onUpdate} = this.props;
        // editing값이 false -> true로 전환될 때, info값을 state에 넣어준다.
        if(!prevState.editing && this.state.editing) {
            this.setState({
                name: info.name,
                phone: info.phone
            });
        }
        
        // editing값이 true -> false로 전환될 때
        if(prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 수정상태가 아니고, info 값이 같다면 리렌더링 안함.
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info) {
            return false;
        }
        // 나머지 경우엔 리렌더링함.
        return true;
    }

    render() {
        console.log('render PhoneInfo: ' + this.props.info.id);
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        // 수정모드
        const {editing} = this.state;

        if(editing) {
            return (
                <div style={style}>
                    <div>
                        <input placeholder="이름" value={this.state.name} onChange={this.handleChange} name="name" />
                    </div>
                    <div>
                        <input placeholder="전화번호" value={this.state.phone} onChange={this.handleChange} name="phone" />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }
        // 일반모드
        const {name, phone} = this.props.info;

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;