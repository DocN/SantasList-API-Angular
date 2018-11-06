using Microsoft.AspNetCore.Identity;
using SantaAPI.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.Data
{
    public class Seed {
        public static async Task Initialize(ApplicationDBContext context,
                                RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            String adminId1 = "";
            String adminId2 = "";

            string role1 = "Admin";
            string desc1 = "This is the administrator role";

            string role2 = "Child";
            string desc2 = "This is the members role";
            context.Database.EnsureCreated();
            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role1));
            }
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role2));
            }

            if (await userManager.FindByEmailAsync("santa@np.com") == null)
            {
                IdentityUser newUser = new IdentityUser();
                newUser.Email = "santa@np.com";
                newUser.UserName = "santa";

                var result = await userManager.CreateAsync(newUser, "P@$$w0rd");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newUser, "Admin");
                }
            }

            if (await userManager.FindByEmailAsync("tim@np.com") == null)
            {
                IdentityUser newUser = new IdentityUser();
                newUser.Email = "tim@np.com";
                newUser.UserName = "tim";
                var result = await userManager.CreateAsync(newUser, "P@$$w0rd");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newUser, "Child");
                }
            }

        }
    }
}
