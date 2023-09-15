// 자주쓰이는 css
const common = {
    flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
    flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const color = {
    background: '#FFFFF9',
    main1: '#8390FA',
    main2: '#5452B7',
    main3: '#3D3B8E',
    highlight: '#F4E409',
    warning: '#C14953',
    dark1: '#5B5549',
    dark2: '#5B5549',
    black: '#171512',
    gray: '#CDCED9',
    white: '#ffffff',
};

const shadow = {
    card: `2px 2px 5px -1px rgba(108, 108, 162, 0.25), -1px -1px 5px -1px rgba(108, 108, 162, 0.25);`,
    paperLeftPage: `-15px 0px 10px 0px rgba(0, 0, 0, 0.25) inset`,
    paperRightPage: `10px 0px 30px 0px rgba(0, 0, 0, 0.25) inset`,
    paperTotalPage: `10px 11px 15px 0px rgba(0, 0, 0, 0.25)`,
    paperTotalReversePage: `-10px 11px 15px 0px rgba(0, 0, 0, 0.25)`,
    paperCoverLeftPage: `0px 0px 30px 5px rgba(0, 0, 0, 0.25) inset`,
    pageCoverBackPage: `0px 0px 30px 5px rgba(0, 0, 0, 0.25) inset`,
};

const fontSize = {
    title1: '100px',
    title2: '60px',
    title3: '40px',
    subTitle1: '28px',
    subTitle2: '20px',
    content1: '18px',
    content2: '15px',
    sub: '13px',
};

const Theme = {
    common,
    color,
    shadow,
    fontSize,
};

export default Theme;
