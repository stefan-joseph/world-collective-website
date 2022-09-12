// import {useEffect} from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";

function PageTransition({ children, pageLoading, menuIsClosed }) {
  const router = useRouter();

  if (!menuIsClosed || menuIsClosed === "closing") {
    return (
      <TransitionGroup component={null}>
        <CSSTransition
          key={router.pathname}
          classNames="closedPage"
          timeout={3000}
        >
          <div className="page">{children}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  } else {
    return (
      <TransitionGroup component={null}>
        <CSSTransition
          key={router.pathname}
          classNames="openPage"
          timeout={1000}
        >
          <div className="page">{children}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default PageTransition;
