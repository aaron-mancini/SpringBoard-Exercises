def serialize_cupcake(cupcake):
    """Serialize a cupcake SQLAlchemy obj to dict"""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }