import { SectorComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg";

export default function SectorCard() {
  return (
    <SectorComponent>
      <section>
        <div className="all-sector">
          <div className="header-sector">
            <h3>aaaa</h3>
            <img src={HenryCalvo} />
          </div>

          <div className="p-sector">
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
          </div>

          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni
            consequatur temporibus, veritatis perspiciatis neque eius. Dicta,
            distinctio? Vitae itaque fugiat neque consequatur eius asperiores
            aliquam illo repellat sint quos!
          </p>
        </div>
      </section>
    </SectorComponent>
  );
}
