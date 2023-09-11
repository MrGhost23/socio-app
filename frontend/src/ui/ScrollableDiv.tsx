type Props = {
  className?: string;
  children: React.ReactNode;
};

const ScrollableDiv: React.FC<Props> = (props) => {
  return (
    <div 
      className={props.className ? 'pr-5 overflow-y-auto ' + props.className : 'pr-5 overflow-y-auto'} 
    >
      {props.children}
    </div>
  )
}

export default ScrollableDiv