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
};

const shadow = {
    card: `-1px -1px 5px rgba(0.42352941632270813,0.42352941632270813,0.6352941393852234,0.25);`,
    paperLeftPage: `inset -10px 0px 4px rgba(0, 0, 0.25)`,
    paperRightPage: `inset 10px 0px 30px rgba(0, 0, 0.25)`,
    paperTotalPage: `10px 10px 7px rgba(0, 0, 0, 0.25)`,
};

const Theme = {
    common,
    color,
    shadow,
};

export default Theme;
