import BarGraph from "./bar/barGraph";
import LineGraph from "./line/lineGraph";
import { HomeGraphContainer } from "./styles";

const HomeGraph = () => {
  return (
    <HomeGraphContainer>
      <section className="big-numbers">
        <div className="section-header">
          <h1>chamados graciosa country club</h1>
        </div>
        <ul className="big-numbers-list">
          <li>
            <p>35+</p>
            <span>Chamados abertos no ultimo mes</span>
          </li>

          <li>
            <p>100</p>
            <span>Chamdos totais</span>
          </li>
        </ul>
      </section>

      <section className="bar-chart">
        <BarGraph />
      </section>

      <section className="line-chart">
        <LineGraph />
      </section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
