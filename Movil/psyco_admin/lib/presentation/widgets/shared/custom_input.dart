import 'package:flutter/material.dart';

class CustomInputWidget extends StatelessWidget {
  final TextEditingController control;
  final String label;
  final List<String? Function(String?)> validations;
  final bool obscure;

  const CustomInputWidget({
    Key? key,
    required this.control,
    required this.label,
    required this.validations,
    this.obscure = false
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return SizedBox(
      width: size.width > 500 ? size.width / 2 : double.infinity,
      child: TextFormField(
        obscureText: obscure,
        controller: control,
        decoration: InputDecoration(
          labelText: label,
          filled: true,
        ),
        validator: (value) {
          for (final validation in validations) {
            final result = validation(value);
            if (result != null) {
              return result;
            }
          }
          return null;
        },
      ),
    );
  }
}
