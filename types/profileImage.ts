/**
 * Represents a cropped image object with an image URL and a STRAPI ID.
 * @interface
 */
export interface CroppedImg {
  /**
   * The URL of the cropped image.
   * @type {string}
   */
  imgUrl: string;

  /**
   * The ID of the cropped image in STRAPI.
   * @type {string}
   */
  strapiID: string;
}