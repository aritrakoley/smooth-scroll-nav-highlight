import { useEffect, useRef, useState } from "react";
import "./App.css";

const getSectionBounds = (elm) => {
  return {
    upperBound: elm.offsetTop,
    lowerBound: elm.offsetTop + elm.getBoundingClientRect().height,
  };
};

function App() {
  const [visibleSection, setVisibleSection] = useState(null);

  const alphaRef = useRef(null);
  const betaRef = useRef(null);
  const gammaRef = useRef(null);

  const sectionList = [
    { section: "alpha", ref: alphaRef },
    { section: "beta", ref: betaRef },
    { section: "gamma", ref: gammaRef },
  ];

  useEffect(() => {
    const handleScroll = (e) => {
      const currentSection = sectionList.find((e) => {
        const sectionBounds = getSectionBounds(e.ref.current);
        const cursor = window.scrollY + window.innerHeight / 2;
        return cursor < sectionBounds.lowerBound && cursor > sectionBounds.upperBound;
      });

      if( currentSection && currentSection.section !== visibleSection) {
        setVisibleSection(currentSection.section);
      } else if (!currentSection && visibleSection) {
        setVisibleSection(undefined)
      }

    };
    window.addEventListener("scroll", handleScroll);

    return () => { window.removeEventListener("scroll", handleScroll) }
  }, [visibleSection]);

  return (
    <>
      <section className="header">
        <nav>
          <a id="nav_alpha" href="#alpha" className={visibleSection === "alpha" ? "active" : ""}>Alpha</a>
          <a id="nav_beta" href="#beta" className={visibleSection === "beta" ? "active" : ""}>Beta</a>
          <a id="nav_gamma" href="#gamma" className={visibleSection === "gamma" ? "active" : ""}>Gamma</a>
        </nav>
        <button
          onClick={() => {
            const b = getSectionBounds(alphaRef.current);
            console.log(b);
            console.log(window.scrollY);
          }}
        >
          Details
        </button>
      </section>

      <section ref={alphaRef} className="alpha" id="alpha">
        <h1>Alpha</h1>
      </section>

      <section ref={betaRef} className="beta" id="beta">
        <h1>Beta</h1>
      </section>

      <section ref={gammaRef} className="gamma" id="gamma">
        <h1>Gamma</h1>
      </section>

      <section className="footer">
        <h3>Footer</h3>
      </section>
    </>
  );
}

export default App;
