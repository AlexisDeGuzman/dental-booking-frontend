import { useState, useEffect } from 'react';

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Col, Radio, Row, Select, Typography, theme } from 'antd';
import { Container, Row as RowBstrap, Col as ColBstrap, Button } from 'react-bootstrap';
dayjs.extend(dayLocaleData);



const Appointment = () => {
    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = dayjs().format('YYYY-MM-DD');

    // Initialization
    const { token } = theme.useToken();
    const [ date, setDate ] = useState(currentDate);
    const [ time, setTime ] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    // Handle date selection
    const onDateSelect = (date) => {
        setDate(date.format('YYYY-MM-DD'));
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    // Handler function to update the selected value in radio buttons
    const handleRadioChange = (event) => {
      setTime(event.target.value);
      setSelectedValue(event.target.value);
    };

                              
    useEffect(()=>{
        console.log(date);
    },[date])

    return (
    <Container style={wrapperStyle} className='my-5 pt-3 justify-content-center'>
        <h1 className='text-center mt-3'>Appointment</h1>
        <RowBstrap>
            <ColBstrap xs={12} className = 'mt-5 py-5 rounded col-6 mx-auto bg-light' style={{backgroundImage: 'linear-gradient(to left, #C55FFB, #EFDCF9)'}}>
                <Calendar
                    fullscreen={false}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const start = 0;
                        const end = 12;
                        const monthOptions = [];
                        let current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current = current.month(i);
                            months.push(localeData.monthsShort(current));
                        }
                        for (let i = start; i < end; i++) {
                            monthOptions.push(
                                <Select.Option key={i} value={i} className="month-item">
                                    {months[i]}
                                </Select.Option>,
                            );
                        }
                        const year = value.year();
                        const month = value.month();
                        const options = [];
                        for (let i = year - 10; i < year + 10; i += 1) {
                            options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                    {i}
                                </Select.Option>,
                            );
                        }
                        return (
                            <div
                                style={{
                                    padding: 8,
                                }}
                            >
                                <Typography.Title level={4}>Custom header</Typography.Title>
                                <Row gutter={8}>
                                    <Col>
                                        <Radio.Group
                                            size="small"
                                            onChange={(e) => onTypeChange(e.target.value)}
                                            value={type}
                                        >
                                            <Radio.Button value="month">Month</Radio.Button>
                                            <Radio.Button value="year">Year</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            className="my-year-select"
                                            value={year}
                                            onChange={(newYear) => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            value={month}
                                            onChange={(newMonth) => {
                                                const now = value.clone().month(newMonth);
                                                onChange(now);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        );
                    }}
                    onSelect={onDateSelect}
                />
            </ColBstrap>
        </RowBstrap>
        <RowBstrap className='my-3'>
            <ColBstrap>
                <h2 className='text-center'>Available Time</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="option1"
                            checked={selectedValue === 'option1'}
                            onChange={handleRadioChange}
                        />
                        Option 1
                    </label>                        
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="option2"
                            checked={selectedValue === 'option2'}
                            onChange={handleRadioChange}
                        />
                        Option 2
                    </label>
                </div>
                <div>  
                    <label>
                        <input
                            type="radio"
                            value="option3"
                            checked={selectedValue === 'option3'}
                            onChange={handleRadioChange}
                        />
                        Option 3
                    </label>
                </div>

                <h3 className='text-center'>Selected schedule:</h3>

                {selectedValue && <div>{`${date} ${selectedValue}`}</div>}

                <Button>Book</Button>
            </ColBstrap>
        </RowBstrap>
      
      
    </Container>
  );
};
export default Appointment;