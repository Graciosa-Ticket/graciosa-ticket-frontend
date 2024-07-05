import { HomeGraphContainer } from "./styles";

const HomeGraph = () => {
  return (
    <HomeGraphContainer>
      <section className="big-numbers">
        <div className="section-header">
          <h1>Lorem ipsum dolor asimet</h1>
        </div>

        <ul className="big-numbers-list">
          <li>
            <p>35+</p>
            <span>Lorem ipsum</span>
          </li>

          <li>
            <p>100</p>
            <span>Lorem ipsum</span>
          </li>
        </ul>
      </section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
