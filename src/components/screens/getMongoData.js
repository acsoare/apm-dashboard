function getData(props) {
  return (
    <>
      {props.datas.map((data) => (
        <>
          <h1>{data.username}</h1>
          <h1>{data.email}</h1>
        </>
      ))}
    </>
  );
}

export default getData();
