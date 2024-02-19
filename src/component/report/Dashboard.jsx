import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import lecturegif from "../../img/lecture.gif"
import eventsgif from "../../img/Events.gif"
import holidaygif from "../../img/Holiday.gif"
import subjectgif from "../../img/Subject.gif"

const Dashboard = () => {
    const cardItems = [
        {
            id: 1,
            title: "Lecture",
            value: 5,
            image: lecturegif,
        },
        {
            id: 2,
            title: "Subject",
            value: 40,
            image: eventsgif,
        },
        {
            id: 3,
            title: "Event",
            value: 8,
            image: holidaygif,
        },
        {
            id: 4,
            title: "Holiday",
            value: 6,
            image: subjectgif,
        },
    
    ]
    return (
        <Row className="w-full grid gap-y-4 gap-x-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
        {cardItems.map((card) => (
            <Col >
                <Card hoverable bordered={false} className='relative' key={card.id}>
                    <Statistic
                        title={card.title}
                        value={card.value}
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix={<img src={card.image} alt='p-lecture' className='absolute top-0 right-4' />}
                    />
                </Card>
            </Col>
        ))}
    </Row>
    );
}

export default Dashboard;
