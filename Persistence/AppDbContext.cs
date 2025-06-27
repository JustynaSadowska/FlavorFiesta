using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Recipe> Recipes { get; set; }
    public required DbSet<Step> Steps { get; set; }
    public required DbSet<Ingredient> Ingredients { get; set; }
    public required DbSet<Review> Reviews { get; set; }
    public required DbSet<Allergen> Allergens { get; set; }
    public required DbSet<ShoppingList> ShoppingLists { get; set; }
    public required DbSet<ShoppingListItem> ShoppingListItems { get; set; }
    public required DbSet<Tag> Tags { get; set; }
    public required DbSet<Unit> Units { get; set; }
    //public required DbSet<UserFollowing> UserFollowings { get; set; }
   // public required DbSet<Photo> Photos { get; set; }
   // public DbSet<UserFavoriteRecipe> UserFavoriteRecipes { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Step>()
            .HasOne(s => s.Recipe)
            .WithMany(r => r.Steps)
            .HasForeignKey(s => s.RecipeId)
            .IsRequired();

        modelBuilder.Entity<Ingredient>()
            .HasOne(i => i.Recipe)
            .WithMany(r => r.Ingredients)
            .HasForeignKey(i => i.RecipeId)
            .IsRequired();

        modelBuilder.Entity<Ingredient>()
            .HasOne(i => i.Unit)
            .WithMany(r => r.Ingredients)
            .HasForeignKey(i => i.UnitId)
            .IsRequired();

        modelBuilder.Entity<Review>()
            .HasOne(rev => rev.Recipe)
            .WithMany(r => r.Reviews)
            .HasForeignKey(rev => rev.RecipeId)
            .IsRequired();

        modelBuilder.Entity<ShoppingListItem>()
            .HasOne(sli => sli.ShoppingList)
            .WithMany(sl => sl.ShoppingListItems)
            .HasForeignKey(sli => sli.ShoppingListId)
            .IsRequired();

        modelBuilder.Entity<ShoppingListItem>()
            .HasOne(sli => sli.Unit)
            .WithMany(i => i.ShoppingListItems)
            .HasForeignKey(sli => sli.UnitId)
            .IsRequired();

        modelBuilder.Entity<Recipe>()
            .HasOne(r => r.User)
            .WithMany(u => u.Recipes)
            .HasForeignKey(r => r.UserId)
            .IsRequired();

        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .IsRequired();

        modelBuilder.Entity<ShoppingList>()
            .HasOne(sl => sl.User)
            .WithMany(u => u.ShoppingLists)
            .HasForeignKey(sl => sl.UserId)
            .IsRequired();

        modelBuilder.Entity<Tag>()
            .HasMany(t => t.Recipes)
            .WithMany(r => r.Tags)
            .UsingEntity("RecipeTag");

        modelBuilder.Entity<Allergen>()
            .HasMany(a => a.Recipes)
            .WithMany(r => r.Allergens)
            .UsingEntity("RecipeAllergen");

        modelBuilder.Entity<Allergen>()
            .HasMany(a => a.Users)
            .WithMany(u => u.Allergens)
            .UsingEntity("UserAllergen");
        
        // modelBuilder.Entity<UserFollowing>(x => 
        // {
        //     x.HasKey(k => new {k.ObserverId, k.TargetId});

        //     x.HasOne(o => o.Observer)
        //         .WithMany(f => f.Followings)
        //         .HasForeignKey(o => o.ObserverId)
        //         .OnDelete(DeleteBehavior.Cascade);
            
        //     x.HasOne(o => o.Target)
        //         .WithMany(f => f.Followers)
        //         .HasForeignKey(o => o.TargetId)
        //         .OnDelete(DeleteBehavior.NoAction);
        // });

        // modelBuilder.Entity<Photo>()
        //     .HasOne(p => p.Recipe)
        //     .WithMany(r => r.Photos)
        //     .HasForeignKey(p => p.RecipeId)
        //     .IsRequired();
        
        //  modelBuilder.Entity<UserFavoriteRecipe>(x => 
        //  {
        //     x.HasKey(k => new{k.RecipeId, k.UserId});

        //     x.HasOne(uf => uf.User)
        //         .WithMany(u => u.FavoriteRecipes)
        //         .HasForeignKey(uf => uf.UserId)
        //         .IsRequired(false)
        //         .OnDelete(DeleteBehavior.Cascade);
            
        //     x.HasOne(uf => uf.Recipe)
        //         .WithMany(r => r.FavoritedByUsers)
        //         .HasForeignKey(uf => uf.RecipeId)
        //         .IsRequired(false)
        //         .OnDelete(DeleteBehavior.Cascade);;
        //  });
    }
}
