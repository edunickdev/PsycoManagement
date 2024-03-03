import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../config/helpers/Auth/auth_services.dart';
import '../providers/providers.dart';

class SignInWidget extends ConsumerWidget {
  const SignInWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final palette = Theme.of(context).colorScheme;

    return FadeInDown(
      child: Column(
        children: [
          Image.asset("assets/images/PsycoAdmin.png", height: 200),
          TextFormField(
            controller: emailController,
            decoration:
                const InputDecoration(label: Text("Correo electrónico")),
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
            decoration: const InputDecoration(
                label: Text("Contraseña"), fillColor: Colors.amber),
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
                  if (context.mounted) {
                    final result = await signIn(emailController.value.text,
                        passwordController.value.text);

                    if (context.mounted) {
                      switch (result.status) {
                        case "inicio exitoso":
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            backgroundColor: Colors.green[600],
                            content: Text(
                              "Inicio Exitoso, un gusto verte ${result.names.split(" ")[0]}",
                              style: const TextStyle(
                                  fontSize: 15, color: Colors.black87),
                            ),
                            duration: const Duration(seconds: 3),
                          ));
                          context.push("home");
                          break;
                        case "información incorrecta":
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            backgroundColor: Colors.red[200],
                            content: Text(result.message),
                            duration: const Duration(seconds: 4),
                          ));
                        default:
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            backgroundColor: Colors.red[200],
                            content: const Text(
                                "Oh no algo esta mal, intenta mas tarde."),
                            duration: const Duration(seconds: 4),
                          ));
                      }
                    }
                  }

                  emailController.clear();
                  passwordController.clear();
                },
                child: Text(
                  "Iniciar Sesión",
                  style: TextStyle(fontSize: 16, color: palette.secondary),
                )),
          ),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonal(
                style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all(palette.inversePrimary)),
                onPressed: () {
                  ref.read(modeAuthProvider.notifier).update((state) => !state);
                },
                child: Text(
                  "No tengo cuenta",
                  style: TextStyle(fontSize: 16, color: palette.secondary),
                )),
          )
        ],
      ),
    );
  }
}
