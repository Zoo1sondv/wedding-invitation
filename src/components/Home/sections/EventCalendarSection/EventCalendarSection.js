import React from "react";
import clsx from "clsx";
import { FaRegHeart } from "react-icons/fa";
import { getAssetUrl } from "../../../../utils/config";
import style from "./EventCalendarSection.module.scss";

const EventCalendarSection = ({ sectionRef, showSection }) => {
  return (
    <section id="events" ref={sectionRef}>
      <div
        className={style.calendar}
        style={{
          backgroundImage: `url(${getAssetUrl("/assets/img/0F9A6398.jpg")})`,
        }}
      >
        <div className={style.calendar__content}>
          <h1
            className={clsx(style.calendar__month, {
              [style.show]: showSection,
            })}
          >
            November
          </h1>

          <div
            className={clsx(style.calendar__weekdays, {
              [style.show]: showSection,
            })}
          >
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THUR</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>

          <div
            className={clsx(style.calendar__grid, {
              [style.show]: showSection,
            })}
          >
            <div className={style.empty}></div>
            <div className={style.empty}></div>
            <div className={style.empty}></div>
            <div className={style.empty}></div>
            <div className={style.empty}></div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div className={style.intimate_party_day}>
              9
              <FaRegHeart className={`${style.heart} ${style.heart_light}`} />
            </div>
            <div className={style.wedding_day}>
              10
              <FaRegHeart className={`${style.heart} ${style.heart_deep}`} />
            </div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
            <div>24</div>
            <div>25</div>
            <div>26</div>
            <div>27</div>
            <div>28</div>
            <div>29</div>
            <div>30</div>
          </div>

          <div
            className={clsx(style.calendar__legend, {
              [style.show]: showSection,
            })}
          >
            <div className={style.legend_item}>
              <FaRegHeart className={style.legend_heart_light} />
              <span>Ngày 9/11 - Tiệc Thân Mật</span>
            </div>
            <div className={style.legend_item}>
              <FaRegHeart className={style.legend_heart_deep} />
              <span>Ngày 10/11 - Lễ Vu Quy & Lễ Thành Hôn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendarSection;
