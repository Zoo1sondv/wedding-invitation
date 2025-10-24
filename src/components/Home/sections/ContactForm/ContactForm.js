import React, { useState } from "react";
import clsx from "clsx";
import style from "./ContactForm.module.scss";
import { GOOGLE_FORM_CONFIG } from "../../../../utils/googleForm";
import { getAssetUrl } from "../../../../utils/config";

const ContactForm = ({ sectionRef, showSection }) => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    willAttend: "",
    companions: "",
    guestOf: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use config from googleForm.js
      const { FORM_ID, FIELD_IDS } = GOOGLE_FORM_CONFIG;

      // Convert form values to Google Form expected values
      const convertToGoogleFormValues = (data) => {
        const converted = { ...data };

        // Convert willAttend values
        switch (data.willAttend) {
          case "yes":
            converted.willAttend = "Có, tôi sẽ tham dự.";
            break;
          case "no":
            converted.willAttend = "Rất tiếc, tôi không thể tham dự.";
            break;
          case "maybe":
            converted.willAttend = "Chưa chắc, sẽ thông báo sau.";
            break;
          default:
            converted.willAttend = data.willAttend;
            break;
        }

        // Convert guestOf values
        switch (data.guestOf) {
          case "bride":
            converted.guestOf = "Khách mời của cô dâu";
            break;
          case "groom":
            converted.guestOf = "Khách mời của chú rể";
            break;
          default:
            converted.guestOf = data.guestOf;
            break;
        }

        // companions values are already correct format (1 người, 2 người, etc.)

        return converted;
      };

      const convertedData = convertToGoogleFormValues(formData);

      // Create URLSearchParams for proper form encoding
      const params = new URLSearchParams();
      params.append(FIELD_IDS.name, convertedData.name);
      params.append(FIELD_IDS.message, convertedData.message);
      params.append(FIELD_IDS.willAttend, convertedData.willAttend);
      params.append(FIELD_IDS.companions, convertedData.companions);
      params.append(FIELD_IDS.guestOf, convertedData.guestOf);

      // Submit to Google Form
      const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

      await fetch(formUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        mode: "no-cors", // Important for Google Forms
      });

      console.log("Wedding RSVP Form Data submitted to Google Form:", formData);

      // Success (we can't check response due to no-cors mode)
      setSubmitStatus("success");
      setFormData({
        name: "",
        message: "",
        willAttend: "",
        companions: "",
        guestOf: "",
      });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" ref={sectionRef}>
      <div className={style.contactForm}>
        <div
          className={clsx(style.contactForm__content, {
            [style.show]: showSection,
          })}
        >
          <div className={style.contactForm__header}>
            <p>
              Hãy xác nhận sự có mặt của bạn trước ngày 05.11.2025 để chúng mình
              chuẩn bị đón tiếp một cách chu đáo nhất.
              <br />
              Trân trọng!
            </p>
          </div>

          <form className={style.contactForm__form} onSubmit={handleSubmit}>
            {/* Tên của bạn */}
            <div className={style.contactForm__field}>
              <div htmlFor="name">
                <span className={style.contactForm__label}>
                  Tên của bạn <span className={style.required}>*</span>
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên của bạn"
                  required
                  className={style.contactForm__input}
                />
              </div>
            </div>

            {/* Lời nhắn đến cô dâu chú rể */}
            <div className={style.contactForm__field}>
              <div htmlFor="message">
                <span className={style.contactForm__label}>
                  Gửi lời nhắn đến cô dâu chú rể
                </span>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Gửi lời chúc mừng hoặc chia sẻ kỷ niệm đặc biệt..."
                  rows={4}
                  className={style.contactForm__textarea}
                />
              </div>
            </div>

            {/* Bạn sẽ đến chứ? */}
            <div className={style.contactForm__field}>
              <span className={style.contactForm__label}>
                Bạn sẽ đến chứ? <span className={style.required}>*</span>
              </span>
              <div className={style.contactForm__radioGroup}>
                <label className={style.contactForm__radio}>
                  <input
                    type="radio"
                    name="willAttend"
                    value="yes"
                    checked={formData.willAttend === "yes"}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={style.contactForm__radioText}>
                    Có, tôi sẽ tham dự 🎉
                  </span>
                </label>
                <label className={style.contactForm__radio}>
                  <input
                    type="radio"
                    name="willAttend"
                    value="no"
                    checked={formData.willAttend === "no"}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={style.contactForm__radioText}>
                    Rất tiếc, tôi không thể tham dự 😢
                  </span>
                </label>
                <label className={style.contactForm__radio}>
                  <input
                    type="radio"
                    name="willAttend"
                    value="maybe"
                    checked={formData.willAttend === "maybe"}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={style.contactForm__radioText}>
                    Chưa chắc, sẽ thông báo sau 🤔
                  </span>
                </label>
              </div>
            </div>

            {/* Bạn tham dự cùng ai? */}
            {formData.willAttend === "yes" && (
              <div className={style.contactForm__field}>
                <span className={style.contactForm__label}>
                  Bạn tham dự cùng ai? <span className={style.required}>*</span>
                </span>
                <div className={style.contactForm__radioGroup}>
                  <label className={style.contactForm__radio}>
                    <input
                      type="radio"
                      name="companions"
                      value="1 người"
                      checked={formData.companions === "1 người"}
                      onChange={handleInputChange}
                      required
                    />
                    <span className={style.contactForm__radioText}>
                      1 người
                    </span>
                  </label>
                  <label className={style.contactForm__radio}>
                    <input
                      type="radio"
                      name="companions"
                      value="2 người"
                      checked={formData.companions === "2 người"}
                      onChange={handleInputChange}
                      required
                    />
                    <span className={style.contactForm__radioText}>
                      2 người
                    </span>
                  </label>
                  <label className={style.contactForm__radio}>
                    <input
                      type="radio"
                      name="companions"
                      value="3 người"
                      checked={formData.companions === "3 người"}
                      onChange={handleInputChange}
                      required
                    />
                    <span className={style.contactForm__radioText}>
                      3 người
                    </span>
                  </label>
                  <label className={style.contactForm__radio}>
                    <input
                      type="radio"
                      name="companions"
                      value="4 người"
                      checked={formData.companions === "4 người"}
                      onChange={handleInputChange}
                      required
                    />
                    <span className={style.contactForm__radioText}>
                      4 người
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Bạn là khách mời của ai? */}
            <div className={style.contactForm__field}>
              <span className={style.contactForm__label}>
                Bạn là khách mời của ai?{" "}
                <span className={style.required}>*</span>
              </span>
              <div className={style.contactForm__radioGroup}>
                <label className={style.contactForm__radio}>
                  <input
                    type="radio"
                    name="guestOf"
                    value="bride"
                    checked={formData.guestOf === "bride"}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={style.contactForm__radioText}>
                    Khách mời của cô dâu
                  </span>
                </label>
                <label className={style.contactForm__radio}>
                  <input
                    type="radio"
                    name="guestOf"
                    value="groom"
                    checked={formData.guestOf === "groom"}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={style.contactForm__radioText}>
                    Khách mời của chú rể
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className={style.contactForm__submit}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(style.contactForm__button, {
                  [style.submitting]: isSubmitting,
                  [style.success]: submitStatus === "success",
                  [style.error]: submitStatus === "error",
                })}
              >
                {isSubmitting ? (
                  <>
                    <span className={style.spinner}></span>
                    Đang gửi...
                  </>
                ) : submitStatus === "success" ? (
                  <>✓ Đã gửi thành công!</>
                ) : submitStatus === "error" ? (
                  <>✗ Có lỗi xảy ra, vui lòng thử lại</>
                ) : (
                  <>GỬI LỜI NHẮN & XÁC NHẬN</>
                )}
              </button>
            </div>

            {/* Gửi quà mừng cưới button */}
            <div className={style.contactForm__giftButton}>
              <button
                type="button"
                className={style.contactForm__giftBtn}
                onClick={() => setShowQRModal(true)}
              >
                GỬI QUÀ MỪNG CƯỚI
              </button>
            </div>

            {submitStatus === "success" && (
              <div className={style.contactForm__success}>
                <p>
                  🎉 Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn
                  trong ngày đặc biệt này.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div className={style.qrModal} onClick={() => setShowQRModal(false)}>
          <div
            className={style.qrModal__content}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.qrModal__header}>
              <h3>Gửi Quà Mừng Cưới</h3>
              <button
                className={style.qrModal__close}
                onClick={() => setShowQRModal(false)}
              >
                ✕
              </button>
            </div>
            <div className={style.qrModal__body}>
              <div className={style.qrModal__qrContainer}>
                <div className={style.qrModal__qrItem}>
                  <h4>Chú Rể</h4>
                  <img
                    src={getAssetUrl("/assets/img/qr/husband.jpg")}
                    alt="QR Code Chú Rể"
                    className={style.qrModal__qrImage}
                  />
                </div>
                <div className={style.qrModal__qrItem}>
                  <h4>Cô Dâu</h4>
                  <img
                    src={getAssetUrl("img/qr/wife.jpg")}
                    alt="QR Code Cô Dâu"
                    className={style.qrModal__qrImage}
                  />
                </div>
              </div>
              <div className={style.qrModal__note}>
                <p>Cảm ơn bạn đã gửi quà mừng cưới! 💖</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
