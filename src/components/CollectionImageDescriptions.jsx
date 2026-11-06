import React from 'react';

const DEFAULT_COLLECTION_ROWS = [
  {
    id: 'productRowHappyPeriod',
    badgeClass: 'tag-badge orange',
    badgeText: 'MENSTRUAL CARE',
    heading: 'Happy Period Box',
    img: 'assets/images/box-period.jpg',
    alt: 'Happy Period Box curated gift essentials',
    reverse: false,
    descDesktop:
      "The first box in the line that was started as an initiative to break the taboo around menstruation by turning it into gifting. While most ads or brands showcase women becoming superwomen after putting on a pad, through HPB we highlight the topics of PMS and Pain. The contents included in the box are carefully curated, backed by science - with a touch of pampering that's well deserved!",
    descMobile:
      'An initiative to break the taboo around menstruation by turning period care into thoughtful gifting. Carefully curated and backed by science to ease PMS and pain with well-deserved pampering.'
  },
  {
    id: 'productRowGiftIron',
    badgeClass: 'tag-badge sage',
    badgeText: 'EVERYDAY HEALTH & VITALITY',
    heading: 'Gift Iron – Not Gold',
    img: 'assets/images/box-iron.jpg',
    alt: 'Gift Iron Not Gold awareness and nutrition box',
    reverse: true,
    descDesktop:
      "1 in 2 Indian menstruators are anaemic. Anaemia is a silent epidemic that's affecting a huge population and symptoms are overlooked since they present as lack of concentration, tiredness, dizziness etc. Women are well known to ignore their own health and this issue gets overlooked most often till Pregnancy in the Indian scenarios. A collection of iron-rich products, snacks, cookies, and more is included to increase awareness and to prompt women to take care of their own health seriously. An educational booklet as well is included in the box.",
    descMobile:
      '1 in 2 Indian menstruators face anaemia, a silent epidemic often overlooked as everyday tiredness. This box pairs iron-rich snacks, cookies, and an educational booklet to help women prioritize their health.'
  },
  {
    id: 'productRowPostpartum',
    badgeClass: 'tag-badge orange',
    badgeText: 'MOTHERHOOD & FOURTH TRIMESTER',
    heading: 'Post-Pregnancy Care Box',
    img: 'assets/images/box-postpartum.jpg',
    alt: 'Post Pregnancy Care Box for new mothers',
    reverse: false,
    descDesktop:
      "Till delivery, a woman is well taken care of throughout the entire pregnancy period. This attention shifts to the baby after delivery and the physical/mental health of the mother is overlooked. The post-delivery period is known as the 4th trimester because of the immense changes in hormonal levels and the psychological impacts of the same. This box was curated to shower love on the woman she is, not just as a mother, but as an independent human being who still deserves to be loved and cared for. It's made with self-care products to pamper her to ease the immense emotional roller coaster she goes through in the initial weeks post-delivery.",
    descMobile:
      "Designed for the 4th trimester, when attention shifts to the baby and a mother's recovery is often overlooked. Curated with soothing self-care essentials to comfort and pamper her post-delivery."
  },
  {
    id: 'productRowMenopause',
    badgeClass: 'tag-badge sage',
    badgeText: 'MENOPAUSE JOURNEY & DIGNITY',
    heading: 'Pre & Post-Menopausal Gift Box',
    img: 'assets/images/box-menopause.jpg',
    alt: 'Pre and Post Menopausal wellness and comfort box',
    reverse: true,
    descDesktop:
      "Menopause as a topic is rarely discussed and the knowledge regarding the same is even scarce among doctors since it's dismissed just as a phase. Once you get older, the feeling of becoming invisible to the world gets stronger since your issues are no longer considered important. This menopause guided gift box is intended to address the immense changes happening in the body during this period, which most people find hard to process since it's all new and overwhelming. The phase of the end of fertility shouldn't make one feel smaller, instead be lovd and pampered as she has been all her life.",
    descMobile:
      'Created to break the silence around menopause and support women through overwhelming hormonal changes. A guided gift box to remind her she deserves to feel seen, loved, and pampered at every stage.'
  }
];

export default function CollectionImageDescriptions({ rows = DEFAULT_COLLECTION_ROWS, sectionId = 'collectionExpandedSection' }) {
  return (
    <div className="collection-expanded-section" id={sectionId}>
      <div className="expanded-rows-wrapper" id="expandedRowsWrapper">
        {rows.map((row) => (
          <div
            key={row.id}
            className="expanded-row row align-items-center g-4 g-lg-5"
            id={row.id}
          >
            {row.reverse ? (
              <>
                <div className="col-7 col-lg-6 expanded-col-text">
                  <div className="expanded-text-card">
                    <span className={row.badgeClass}>{row.badgeText}</span>
                    <h4 className="expanded-row-heading">{row.heading}</h4>
                    <p className="expanded-row-desc mb-0">
                      <span className="desc-desktop">{row.descDesktop}</span>
                      <span className="desc-mobile">{row.descMobile}</span>
                    </p>
                  </div>
                </div>
                <div className="col-5 col-lg-6 expanded-col-img">
                  <div className="expanded-img-card">
                    <img
                      src={row.img}
                      alt={row.alt}
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-5 col-lg-6 expanded-col-img">
                  <div className="expanded-img-card">
                    <img
                      src={row.img}
                      alt={row.alt}
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-7 col-lg-6 expanded-col-text">
                  <div className="expanded-text-card">
                    <span className={row.badgeClass}>{row.badgeText}</span>
                    <h4 className="expanded-row-heading">{row.heading}</h4>
                    <p className="expanded-row-desc mb-0">
                      <span className="desc-desktop">{row.descDesktop}</span>
                      <span className="desc-mobile">{row.descMobile}</span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

