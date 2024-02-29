import '../../config/helpers/Auth/auth_services.dart';
import 'package:flutter/material.dart';
import 'package:psyco_admin/domain/Entities/user_entity.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignInWidget extends StatelessWidget {
  const SignInWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();

    return Column(
      children: [
        Image.asset("assets/images/PsycoAdmin.png", height: 200),
        TextFormField(
          focusNode: FocusNode(),
          controller: emailController,
          decoration: const InputDecoration(label: Text("Correo electrónico")),
          validator: (value) {
            String message = "";
            if (value == null || value.isEmpty) {
              message = "Campo no puede estar vacio";
              return message;
            }
            if (value.length < 10) {
              message = "Campo debe tener mas de 10 caracteres";
              return message;
            }
            if (!value.contains("@") && !value.contains(".")) {
              message = "El valor ingresado no es un correo";
              return message;
            } else {
              return null;
            }
          },
        ),
        TextFormField(
          controller: passwordController,
          obscureText: true,
          decoration: const InputDecoration(label: Text("Contraseña")),
          validator: (value) {
            String message = "";
            if (value == null || value.isEmpty) {
              message = "Campo no puede estar vacio";
              return message;
            }
            if (value.length < 8) {
              message = "Campo debe tener mas de 8 caracteres";
              return message;
            } else {
              return null;
            }
          },
        ),
        const SizedBox(height: 20),
        SizedBox(
          width: double.infinity,
          child: FilledButton.tonal(
              onPressed: () async {
                final result = await loginAuth(
                    emailController.value.text, passwordController.value.text);
                print(result?.token);
                final prefs = await SharedPreferences.getInstance();
                if (result != null) {
                  prefs.setString("token", result.token);
                  prefs.setString("id", result.id);
                  prefs.setString("names", result.names);
                }
                emailController.clear();
                passwordController.clear();
              },
              child: const Text(
                "Iniciar Sesión",
              )),
        ),
      ],
    );
  }
}
