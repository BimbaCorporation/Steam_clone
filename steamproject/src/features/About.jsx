import React from 'react';
import "../styles/About.css"
const About = () => {
  return (
    <div>
      <h1>Про нас</h1>
      <p>Я Гладуненко Андрій пахаю один тіма токсіків нічо не робить, дай Боже сили хотя б на зарах.
        Я Поліщук Максим і я піддержую Анрія Гладуненка в його висказувані тому що Олександр Мосійчук сама токсична людина. Я дуже радий що в нас новий тімлід, він сказав добавити мені цю гіфку: </p>
      <div className='grid-gallery-center'>
        <article className="grid-gallery">
          <img src="/image/about/about1.gif" alt="description of picture 1" />
          <img src="/image/about/about2.gif" alt="description of picture 2" />
          <img src="/image/about/about3.gif" alt="description of picture 3" />
          <img src="/image/about/about4.gif" alt="description of picture 4" />
          <img src="/image/about/about5.gif" alt="description of picture 5" />
          <img src="/image/about/about6.gif" alt="description of picture 6" />
          <img src="/image/about/about7.gif" alt="description of picture 7" />
          <img src="/image/about/about8.gif" alt="description of picture 8" />
        </article>
      </div>
    </div>
  );
};

export default About;
