import React, {Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 다음 받아올 data가 현재 data랑 다른 배열일 때 true로 설정.
        return nextProps.data !== this.props.data;
    }

    render(){
        console.log('render PhoneInfoList');
        const {data, onRemove, onUpdate} = this.props;
        const list = data.map(
            // 배열을 렌더링할때는 고유값을 key로 사용해야함.
            info => (<PhoneInfo key={info.id} info={info} onRemove={onRemove} onUpdate={onUpdate}/>) 
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;