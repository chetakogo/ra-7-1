import { v4 } from 'uuid';
import Video from './Video';

function VideoList(props) {
  return props.list.map((item) => (
    <Video url={item.url} date={item.date} key={v4()} />
  ));
}

export default VideoList;