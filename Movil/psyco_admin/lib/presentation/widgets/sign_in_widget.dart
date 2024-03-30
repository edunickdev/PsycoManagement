import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:psyco_admin/config/shared/input_validations.dart';
import 'package:psyco_admin/presentation/widgets/shared/custom_input.dart';
import '../../config/helpers/Auth/auth_services.dart';
import '../providers/providers.dart';

class SignInWidget extends ConsumerWidget {
  final GlobalKey<FormState> formKey;

  const SignInWidget({
    Key? key,
    required this.formKey,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final size = MediaQuery.of(context).size;
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final palette = Theme.of(context).colorScheme;

    void login (){
      if (formKey.currentState!.validate()) {
        final email = emailController.value.text;
        final password = passwordController.value.text;
        signIn(email, password).then(
          (value) {
            if (value.status == "inicio exitoso") {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  backgroundColor: Colors.green[600],
                  content: Text(
                    "Inicio Exitoso, un gusto verte ${value.names.split(" ")[0]}",
                    style: const TextStyle(fontSize: 15, color: Colors.black87),
                  ),
                  duration: const Duration(seconds: 4),
                ),
              );
              context.push("home");
            }
          },
        ).catchError(
          (error) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                backgroundColor: Colors.red[200],
                content: const Text("Oh no algo esta mal, intenta mas tarde."),
                duration: const Duration(seconds: 5),
              ),
            );
          },
        );
      }
      emailController.clear();
      passwordController.clear();
    }

    return FadeInDown(
      child: SizedBox(
        width: double.infinity,
        child: Column(
          children: [
            Image.asset("assets/images/PsycoAdmin.png", height: 200),
            CustomInputWidget(
              control: emailController,
              label: "Correo electrónico",
              validations: const [emailValidations],
            ),
            const SizedBox(height: 20),
            CustomInputWidget(
              obscure: true,
              control: passwordController,
              label: "Contraseña",
              validations: const [passwordValidations],
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: size.width > 650 ? size.width / 3 : double.infinity,
              child: FilledButton.tonal(
                onPressed: login,
                child: Text(
                  "Iniciar Sesión",
                  style: TextStyle(fontSize: 16, color: palette.secondary),
                ),
              ),
            ),
            SizedBox(
              width: size.width > 650 ? size.width / 3 : double.infinity,
              child: FilledButton.tonal(
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all(palette.inversePrimary),
                ),
                onPressed: () {
                  ref.read(modeAuthProvider.notifier).update((state) => !state);
                },
                child: Text(
                  "No tengo cuenta",
                  style: TextStyle(fontSize: 16, color: palette.secondary),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
