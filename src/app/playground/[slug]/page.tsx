interface Props {
  params: {
    slug: String;
  };
}

const PlaygroundSlug: React.FC<Props> = (props) => {
  return <div>PlaygroundSlug {props.params.slug}</div>;
};

export default PlaygroundSlug;
