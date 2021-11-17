

public static class Services
{
    public static Action<IServiceCollection> RegisterServices = (IServiceCollection services) =>
    {
        services.AddMatBlazor();
        services.AddMatToaster();
    };
}
