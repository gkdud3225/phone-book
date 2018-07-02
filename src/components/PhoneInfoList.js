import React, {Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
    static defaultProps = {
        data: []
    }

    render(){
        const {data} = this.props;
        const list = data.map(
            // 배열을 렌더링할때는 고유값을 key로 사용해야함.
            info => (<PhoneInfo key={info.id} info={info} />) 
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;