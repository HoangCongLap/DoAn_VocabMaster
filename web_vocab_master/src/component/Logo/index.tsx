import "./index.css";
export default function Logo() {
  return (
    <button className="button" data-text="Awesome">
      <span className="actual-text">&nbsp;VocabMaster&nbsp;</span>
      <span aria-hidden="true" className="hover-text">
        &nbsp;VocabMaster&nbsp;
      </span>
    </button>
  );
}
