
String? emailValidations(String? value) {
  if (value == null || value.isEmpty) {
    return "Este campo no puede estar vacío";
  } else if (!value.contains("@") || !value.contains(".")) {
    return "El campo debe ser un correo electrónico válido";
  }
  return null;
}

String? passwordValidations(String? value) {
  if (value == null || value.isEmpty) {
    return "Campo no puede estar vacío";
  } else if (value.length < 8) {
    return "Campo debe tener 8 o más caracteres";
  }
  return null;
}

String? namesValidations(String? value) {
  if (value == null || value.isEmpty) {
    return "Campo no puede estar vacío";
  } else if (value.length <= 5){
    return "Este campo debe tener al menos 5 caractéres";
  } else if(value.length >= 40){
    return "Este campo no puede tener más de 40 caratéres";
  }
  return null;
}

String? lastNamesValidations(String? value) {
  if (value == null || value.isEmpty) {
    return "Campo no puede estar vacío";
  } else if (value.length <= 5) {
    return "Este campo debe tener al menos 5 caractéres";
  } else if (value.length >= 40) {
    return "Este campo no puede tener más de 40 caratéres";
  }
  return null;
}
