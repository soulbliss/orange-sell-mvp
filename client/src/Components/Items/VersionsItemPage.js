import React, { Fragment, useRef, useEffect } from 'react';


import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

import Button from '@material-ui/core/Button';

import { Container, Row, Col } from 'reactstrap';




function HumanReadableTimeFormatting(updatedDate) {
    return moment(parseInt(updatedDate)).format('dddd DD MMM, h:mm A');
}

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const VersionsItemPage = ({ match, location }) => {


    const { _id } = match.params._id;
    const { item } = location.state

    const arrLen = item.length;

    const messageRef = useRef();

    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView(
            {
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest'
            })
        }
      })
    

    return (

        <Container fluid>
            <div class="thinkVer-timeline-body">

                <div class="g--flex">
                    
                    <article>

                        <ul class="timeline">

                            <div class="timeline__endured">

                                <div class="aside filled">

                                    <div class="aside__line filled__line">

                                        <div class="filled__line__completed" style={{ height: '100%' }}>

                                        </div>

                                    </div>

                                </div>




                                {item.map((tht, index) => {


                                    if (index + 1 === arrLen) {
                                        // last one

                                        return (
                                            <Fragment>

                                                

                                                <li class="timeline__event is--monday is--today">

                                                    <Container>
                                                        <Row  >

                                                            <Col md={3}>

                                                                <p class="timeline__event__date">{HumanReadableTimeFormatting(tht.time)}</p>

                                                            </Col>

                                                            <Avatar style={{ margin: 5, left: 5 }} alt="Remy Sharp" src="https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4" />


                                                            <Col  md={7}>
                                                                <p class="timeline__event__title">{tht.think}</p>

                                                                <p class="timeline__event__difference"></p>

                                                            </Col>

                                                        </Row>
                                                    </Container>








                                                </li>
                                            </Fragment>
                                        )


                                    } else if (index === 0) {
                                        // first one

                                        return (
                                            <li class="timeline__event is--first-day is--monday is--complete">


                                                <Container>
                                                    <Row>

                                                        <Col md={3}>

                                                            <p class="timeline__event__date">{HumanReadableTimeFormatting(tht.time)}</p>

                                                        </Col>

                                                        <Avatar style={{ margin: 5, left: 5 }} alt="Remy Sharp" src="https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4" />


                                                        <Col md={7}>
                                                            <p class="timeline__event__title">{tht.think}</p>

                                                            <p class="timeline__event__difference"></p>

                                                        </Col>

                                                    </Row>
                                                </Container>

                                            </li>

                                        )
                                    } else {
                                        // middle one

                                        return (
                                            <Fragment>

                                                <li class="blankSpace50">

                                                    

                                                </li>

                  

                                                <li class="timeline__event is--complete ">

                                                    <Container>
                                                        <Row>

                                                            <Col md={3}>

                                                                <p class="timeline__event__date">{HumanReadableTimeFormatting(tht.time)}</p>

                                                            </Col>

                                                            <figure class="dot">

                                                                <span class="ratio svg dot__icon">
                                                                    <canvas width="9px" height="9px"></canvas>
                                                                    <svg viewBox="0 0 9 9">
                                                                        <use xlinkHref="/src/svg/symbols/symbols.svg#tick"></use>
                                                                    </svg>
                                                                </span> </figure>


                                                            <Col md={7}>
                                                                <p class="timeline__event__title">{tht.think}</p>

                                                                <p class="timeline__event__difference"></p>

                                                            </Col>

                                                        </Row>
                                                    </Container>
                                                </li>

                                            </Fragment>
                                        )
                                    }

                                }

                                )}




                                <div class="aside unfilled">

                                    <div class="aside__line">

                                    </div>

                                </div>



                            </div>



                        </ul>

                    </article>


                </div>

            </div >
            <div id="last-element" ref={messageRef}> </div>
        </Container>

    );
}

export default VersionsItemPage;
