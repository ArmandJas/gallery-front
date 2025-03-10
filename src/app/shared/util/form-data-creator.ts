export class FormDataCreator {
  public static createFormData(object: Object) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(object)) {
      if (value) {
        formData.append(key, value);
      }
    }
    return formData;
  }
}
