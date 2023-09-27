interface Props {
  params: {
    slug: String;
  };
}

const PlaygroundSlug: React.FC<Props> = (props) => {
  console.log("props", props.params.slug);
  return <div>PlaygroundSlug {props.params.slug}</div>;
};

export default PlaygroundSlug;
