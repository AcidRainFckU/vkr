import { FC } from 'react';
import Highlight from 'react-highlight';
import '../../../../node_modules/highlight.js/styles/a11y-dark.css';

const Paragraph: FC<any> = ({ type, data }) => {
  if (type === 'header') {
    return <h3 className="paragraph__h3">{data.text}</h3>;
  } else if (type === 'paragraph') {
    return <p className="paragraph__text my-4" dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  } else if (type === 'linkTool') {
    return <Highlight innerHTML>{data.link}</Highlight>;
  } else if (type === 'code') {
    return (
      <div className="paragraph__code">
        <Highlight className="codeInnter_code">{data.code}</Highlight>
      </div>
    );
  } else if (type === 'raw') {
    return (
      <div className="flex paragraph__html">
        <div className="innerFalse">
          <p className="title">Ввод</p>
          <hr />
          <Highlight className="codeInnter" innerHTML={false}>
            {data.html}
          </Highlight>
        </div>
        <div className="innerTrue">
          <p className="title">Вывод</p>
          <hr />
          <Highlight className="codeInnter" innerHTML={true}>
            {data.html}
          </Highlight>
        </div>
      </div>
    );
  } else if (type === 'list') {
    return (
      <ul className="paragraph__list">
        {data.items.map((el: string, i: number) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: el }}></li>
        ))}
      </ul>
    );
  } else if (type === 'table') {
    if (data.withHeadings) {
      const td = data.content.filter((_: any, idx: number) => idx !== 0);
      return (
        <table className="paragraph__table">
          <thead>
            <tr>
              {data.content[0].map((el: string, i: number) => (
                <th key={i} dangerouslySetInnerHTML={{ __html: el }}></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {td.map((el: any, idx: number) => (
              <tr key={idx}>
                {el.map((y: any, i: number) => (
                  <td key={i} dangerouslySetInnerHTML={{ __html: y }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="paragraph__table">
          <tr>
            {data.content.map((el: any, i: number) => (
              <tr key={i}>
                {el.map((y: string, idx: number) => (
                  <td key={idx} dangerouslySetInnerHTML={{ __html: y }}></td>
                ))}
              </tr>
            ))}
          </tr>
        </table>
      );
    }
  }
  return <div>Paragraph</div>;
};

export default Paragraph;
