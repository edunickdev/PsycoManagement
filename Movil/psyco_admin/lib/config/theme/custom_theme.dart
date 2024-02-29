import 'package:flutter/material.dart';

const Color _mainColor = Color(0xFF3857E0);

const List<Color> colorListThemes = [
  _mainColor,
  Colors.greenAccent,
  Colors.blueGrey,
  Colors.pinkAccent,
  Colors.yellowAccent
];


class CustomTheme {
  final int selectedColor;

  CustomTheme({this.selectedColor = 3})
  : assert(selectedColor >= 0 && selectedColor <= colorListThemes.length - 1, "El color seleccionado debe estar entre 0 y ${colorListThemes.length - 1}" );

  ThemeData myTheme() {
    return ThemeData(
      useMaterial3: true,
      colorSchemeSeed: colorListThemes[selectedColor],
      brightness: Brightness.light
    );
  }

}



