import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as hooks from 'hooks';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

const MbtiTest = () => {
    const { questions, answers, result, setResult } = hooks.mbtiState();
    const [currentNumber, setCurrentNumber] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (questions) {
            setCurrentQuestion(questions.find(question => question.no === currentNumber));
        }
        if (currentNumber === 13) {
            const ei =
                (answers[0] === 1 ? 1 : 2) + (answers[1] === 1 ? 2 : 1) + (answers[2] === 1 ? 1 : 2) >= 5 ? 'I' : 'E';
            const sn =
                (answers[3] === 1 ? 1 : 2) + (answers[4] === 1 ? 2 : 1) + (answers[5] === 1 ? 2 : 1) >= 5 ? 'S' : 'N';
            const ft =
                (answers[6] === 1 ? 1 : 2) + (answers[7] === 1 ? 1 : 2) + (answers[8] === 1 ? 1 : 2) >= 5 ? 'T' : 'F';
            const pj =
                (answers[9] === 1 ? 1 : 2) + (answers[10] === 1 ? 1 : 2) + (answers[11] === 1 ? 1 : 2) >= 5 ? 'P' : 'J';
            if (ei && sn && ft && pj) {
                setResult(ei + sn + ft + pj);
                navigate(utils.URL.MBTI.RESULT);
            }
        }
    }, [currentNumber]);

    const handleClick1 = () => {
        answers[currentNumber - 1] = 1;
        setCurrentNumber(currentNumber + 1);
    };

    const handleClick2 = () => {
        answers[currentNumber - 1] = 2;
        setCurrentNumber(currentNumber + 1);
    };

    return (
        <S.Wrap>
            <S.QuestionNumber>Q{currentQuestion && currentQuestion.no}</S.QuestionNumber>
            <S.QuestionContent>
                {currentQuestion &&
                    currentQuestion.question.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
            </S.QuestionContent>
            <S.SelectContainer onClick={handleClick1}>{currentQuestion && currentQuestion.ans1}</S.SelectContainer>
            <S.SelectContainer onClick={handleClick2}>{currentQuestion && currentQuestion.ans2}</S.SelectContainer>
            <S.ProgressContainer>
                <S.Progress progress={currentNumber}></S.Progress>
            </S.ProgressContainer>
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 108px 156px 0;
        & div {
            transition: all 0.3s linear;
        }
    `,
    QuestionNumber: styled.div`
        width: 100%;
        height: auto;
        font-size: ${({ theme }) => theme.fontSize.title2};
        color: ${({ theme }) => theme.color.black};
        margin-bottom: 24px;
    `,
    QuestionContent: styled.div`
        width: 100%;
        height: 168px;
        white-space: nowrap;
        font-size: ${({ theme }) => theme.fontSize.subTitle1};
        line-height: 56px;
        color: ${({ theme }) => theme.color.black};
        margin-bottom: 48px;
    `,
    SelectContainer: styled.div`
        width: 100%;
        height: 105px;
        padding: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        background-color: ${({ theme }) => theme.color.white};
        border-radius: 16px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        font-size: ${({ theme }) => theme.fontSize.subTitle2};
        color: ${({ theme }) => theme.color.main1};
        margin-bottom: 32px;
        &:hover {
            background-color: ${({ theme }) => theme.color.main1};
            color: ${({ theme }) => theme.color.white};
            transition: all 0.2s linear;
        }
    `,
    ProgressContainer: styled.div`
        width: 100%;
        height: 8px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.color.gray};
        display: flex;
        justify-content: flex-start;
    `,
    Progress: styled.div`
        width: calc(${({ progress }) => ((progress - 1) / 12) * 100}%);
        height: 100%;
        background-color: ${({ theme }) => theme.color.main1};
        border-radius: 8px;
    `,
};

export default MbtiTest;
