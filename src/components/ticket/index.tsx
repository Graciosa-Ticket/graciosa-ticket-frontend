import { TicketContainer } from "./styles";

export default function TicketCard() {
  return (
    <TicketContainer>
      <section>
        <div className="ticketCard-div">
          <div className="top-ticketCard">
            <h1>Titulo</h1>
            <p>03 de set</p>
            <div className="mockup-teste">Urgente</div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim...
          </p>
        </div>
      </section>
    </TicketContainer>
  );
}
